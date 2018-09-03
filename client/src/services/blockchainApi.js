import request from '../utils/request';
import fetch from 'dva/fetch';
const uuidv4 = require('uuid/v4');

const blockchainREST_API = 'http://9.21.110.120:3000/api'

function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
  })
  .then(response => response.json()) // parses response to JSON
}

export async function queryDonor(donorID) {
    return request(blockchainREST_API + '/Donor/' + donorID );
}

export async function queryCharitableAsset(donor) {
    return request(blockchainREST_API + '/CharitableAsset');
}

export async function queryCharities(params){
    return request(blockchainREST_API + '/Charity')
}

export async function queryCharity() {
    return request(blockchainREST_API + '')
}
export async function depositMoney(amount, donorID) {
    
    let data = {
        $class: 'org.example.charities.CharitableAsset',
        type:'MONEY',
        owner: donorID,
        cadValue:amount,
        assetId:uuidv4(),
        assetName:'cash',
    }
  return postData(blockchainREST_API + '/CharitableAsset',data)};

export async function donate(donateAsset) {
    
    let data = {
        $class: "org.example.charities.Donate",
        donatedAsset: "org.example.charities.CharitableAsset#e70e4702-3998-4119-87bd-710fdd27094c",
        quantity: 1,
        donor: 'resource:org.example.charities.Donor#1111',
        charity: 'org.example.charities.Charity#1111',
        timestamp: Date.now()
      };
    return postData(blockchainREST_API + '/Donate',data)
}

export async function requestRecepit(params) {
    return request(blockchainREST_API + '/DonationSlip')
}
