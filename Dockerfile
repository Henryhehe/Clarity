FROM node:8.11-alpine
FROM python:2.7-alpine
# Set the working directory
WORKDIR /app
# Copy the contents of the current directory to the working dir
ADD . /app

# Install the CLI tools
RUN apk add --update nodejs-npm && apk add --update alpine-sdk && npm install -g --unsafe-perm composer-cli && npm install -g --unsafe-perm composer-rest-server
RUN apk add --update bash && rm -rf /var/cache/apk/*


# Install Hyperledger Fabric
RUN cd charity-blockchain && mkdir fabric-dev-servers && cd fabric-dev-servers \ 
  && curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz \
  && tar -xvf fabric-dev-servers.tar.gz && rm fabric-dev-servers.tar.gz && ls -l \
  && ./downloadFabric.sh && ./startFabric.sh && ./createPeerAdminCard.sh 

RUN composer network install --card PeerAdmin@hlfv1 --archiveFile charity-blockchain\@0.0.1.bna \ 
  && composer network start --networkName charity-blockchain --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card \
  && composer card import --file networkadmin.card && composer network ping --card admin@charity-blockchain

# Deploy the business server and the REST Server
RUN composer-rest-server -c admin@charity-blockchain -n never -w true
RUN cd ../..
# Install the NPM dependencies for the client application
RUN cd client
RUN npm install
EXPOSE 8000
CMD [ "npm", "start" ]