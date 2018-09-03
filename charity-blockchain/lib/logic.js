/**
 * Donation transaction
 * @param {org.example.charities.Donate} donation
 * @transaction
 */
async function donationTransaction(donation) {
  const { donatedAsset, quantity, donor, charity } = donation;
  const factory = getFactory();

  // Update the owner
  donatedAsset.owner = charity;
  // donatedAsset.holder = charity;

  // Update the charity
  charity.totalHoldings += quantity;

  // Get the asset registry for the asset
  const assetRegistry = await getAssetRegistry('org.example.charities.CharitableAsset');
  const charityRegistry = await getParticipantRegistry('org.example.charities.Charity');
  const donorRegistry = await getParticipantRegistry('org.example.charities.Donor');
  const donationSlipRegistry = await getAssetRegistry('org.example.charities.DonationSlip');
  
  // Update the asset in the asset registry
  await assetRegistry.update(donatedAsset);

  // Create donation slip uid
  let sid = parseInt(Math.random() * 9999, 10).toString().padStart(4, '0');
  
  while (await donationSlipRegistry.exists(sid)) {
    sid = parseInt(Math.random() * 9999, 10).toString().padStart(4, '0');
  }
  
  // Create donation slip
  const donationSlip = factory.newResource('org.example.charities', 'DonationSlip', sid);
  const donationSlipRef = factory.newRelationship(donationSlip.getNamespace(), donationSlip.getType(), donationSlip.sid);
  
  donationSlip.monetaryValue = donatedAsset.cadValue;
  donationSlip.locationIssued = charity.address.country;
  donationSlip.dateIssued = new Date();
  donationSlip.charity = factory.newRelationship(charity.getNamespace(), charity.getType(), charity.id);
  donationSlip.donor = factory.newRelationship(donor.getNamespace(), donor.getType(), donor.id);
  
  // Add donation slip to asset registry
  await donationSlipRegistry.add(donationSlip);
  
  // Add donation slip to donor's record
  if (donor.donationSlips) {
    donor.donationSlips.push(donationSlipRef);
  } else {
    donor.donationSlips = [donationSlipRef];
  }

  await donorRegistry.update(donor);
  
  // Add donation slip to charity's record
  if (charity.donationSlips) {
    charity.donationSlips.push(donationSlipRef);
  } else {
    charity.donationSlips = [donationSlipRef];
  }

  await charityRegistry.update(charity);
}

/**
 * Fund projects transaction
 * @param {org.example.charities.FundProjects} funds
 * @transaction
 */
async function fundProjectsTransaction(funds) {
  const { charAsset, charity, quantity, beneficiary } = funds;

  // Update the asset, the charity and beneficiary
  charAsset.owner = beneficiary;
  // charAsset.holder = null;
  charity.totalHoldings -= quantity;
  if (charAsset.type === "MONEY") {
    beneficiary.moneyReceived += quantity
  } else if (charAsset.type === "GOODS") {
    beneficiary.goodReceived = parseInt(quantity, 10)
  }
 
  // Get the registries
  const assetRegistry = await getAssetRegistry('org.example.charities.CharitableAsset');
  const charityRegistry = await getParticipantRegistry('org.example.charities.Charity');
  const beneficiaryRegistry = await getParticipantRegistry('org.example.charities.Beneficiary');

  // Update assets and participants 
  await assetRegistry.update(charAsset);
  await charityRegistry.update(charity);
  await beneficiaryRegistry.update(beneficiary);
}

/**
 * File Taxes transaction
 * @param {org.example.charities.FileTaxes} taxes
 * @transaction
 */
async function fileTaxesTransaction(fileTaxes) {
  const { detail, date, regulator, donor, donationsDeclared, totalIncomeDeclared } = fileTaxes;
  const factory = getFactory();

  // Regulator needs to validate the donations declared against the list of registered charities
  const donationAmount = donor.donationSlips
    ? donor.donationSlips.map(slip => {
        const slipRef = factory.newRelationship(slip.getNamespace(), slip.getType(), slip.sid);
	    const slips = slip.charity.donationSlips 
          ? slip.charity.donationSlips.map(dSlip => {
              return factory.newRelationship(dSlip.getNamespace(), dSlip.getType(), dSlip.sid);
            })
          : [];

        if (slips.map(dSlip => dSlip.toString()).indexOf(slipRef.toString()) > -1) {
          return slip.monetaryValue
        } else {
          throw Error('Donation slip is not an official record!');
        }
      }).reduce((a, b) => a + b)
    : 0;
  
  if (donationAmount === donationsDeclared) {
    // create tax slip
    // TODO
  } else {
    throw Error('Amount of donations declared and amount of actual donations made is different!');
  }
}

/**
 * Registering donor transaction
 * @param {org.example.charities.RegisterDonor} register
 * @transaction
 */
async function registerDonor(register) {
  const { charity, donor, date } = register;
  const factory = getFactory();
  const donorRef = factory.newRelationship(donor.getNamespace(), donor.getType(), donor.id);

  // Update the charity
  if (charity.registeredDonors) {
    charity.registeredDonors.push(donorRef);
  } else {
    charity.registeredDonors = [donorRef];
  }

  const charityRegistry = await getParticipantRegistry('org.example.charities.Charity');

  await charityRegistry.update(charity);

  // Emit event
  let event = factory.newEvent('org.example.charities', 'RegisterDonorEvent');
  event.donor = donor;
  event.charity = charity;
  event.date = date;

  emit(event);
}

/**
 * Registering charity transaction
 * @param {org.example.charities.RegisterCharity} register
 * @transaction
 */
async function registerCharity(register) {
  const { charity, government, date } = register;
  const factory = getFactory();
  const charityRef = factory.newRelationship(charity.getNamespace(), charity.getType(), charity.id);

  // Update the government charity array
  if (government.registeredCharities) {
	government.registeredCharities.push(charityRef);
  } else {
    government.registeredCharities = [charityRef];
  }
  
  const govRegistry = await getParticipantRegistry('org.example.charities.Government');

  await govRegistry.update(government);

  // Emit event
  let event = factory.newEvent('org.example.charities', 'RegisterCharityEvent');
  event.government = government;
  event.charity = charity;
  event.date = date;

  emit(event);
}

/**
 * Registering taxpayer transaction
 * @param {org.example.charities.RegisterTaxpayer} register
 * @transaction
 */
async function registerTaxPayer(taxpayerTransaction) {
  const { government, taxpayer } = taxpayerTransaction;
  const factory = getFactory();
  const taxpayerRef = factory.newRelationship(taxpayer.getNamespace(), taxpayer.getType(), taxpayer.id);
 
  // Update the government taxpayers array
  if (government.registeredTaxpayer) {
  	government.registeredTaxpayer.push(taxpayerRef);
  } else {
    government.registeredTaxpayer = [taxpayerRef];
  }

  // Update the registry
  const govRegistry = await getParticipantRegistry('org.example.charities.Government');

  await govRegistry.update(government);
}
