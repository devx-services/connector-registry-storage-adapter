const ConnectorRegistryStorage = require('../dist/index')
const metaUrl = "https://connector-registry/dev/connectors-metadata.json"
const archiveUrl = "https://connector-registry/dev/archive"
const connectorRegistryStorage = new ConnectorRegistryStorage(metaUrl, archiveUrl)
const axios = require('axios').default;

jest.mock("axios");

const data = {
    "connector-1":{
       "author":"VZ",
       "description":"Mock for connector-1",
       "latest":"0.0.2",
       "name":"connector-1",
       "versions":[
          "0.0.1",
          "0.0.2"
       ]
    },
    "connector-2":{
        "author":"VZ",
        "description":"Mock for connector-2",
        "latest":"0.0.2",
        "name":"connector-1",
        "versions":[
           "0.0.1",
           "0.0.2",
           "0.0.3"
        ]
     },
 }

axios.get.mockImplementation(url => {
    if (url.includes(metaUrl)) {
        return Promise.resolve({ data })
    } else if (url.includes(archiveUrl)) {
        const urlParts = url.split("/")
        console.log(urlParts)     
        let name = urlParts[urlParts.length -1]
            .split('.json')[0]
            .split('-')
            .slice(1)
            .join('-')        
        return Promise.resolve({ data: data[name] })
    }       
});


describe('Test Github adapter', function() {
    it('Test "getList" method', async () => {
        const res = await connectorRegistryStorage.getList();
        expect(res).toEqual(data);
    });
    it('Test "get" method', async () => {
        const res = await connectorRegistryStorage.get("connector-2", "0.0.3");
        expect(res).toEqual(data["connector-2"]);
    });
})
