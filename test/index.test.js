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

const axiosGetMockSuccess = url => {
    if (url.includes(metaUrl)) {
        return Promise.resolve({ data })
    } else if (url.includes(archiveUrl)) {
        const urlParts = url.split("/")
        let name = urlParts[urlParts.length -1]
            .split('.json')[0]
            .split('-')
            .slice(1)
            .join('-')        
        return Promise.resolve({ data: data[name] })
    }
}
const axiosGetMockFailedWithError = () => {    
    throw new Error('Something went wront')
}
const axiosGetMockFailedWithoutError = () => {    
    throw 'Something went wront';
}

describe('Test Github adapter', function() {
    it('Test "getList" method', async () => {
        axios.get.mockImplementation(axiosGetMockSuccess);
        const res = await connectorRegistryStorage.getList();
        expect(res).toEqual(data);
    });
    it('Test "getList" method with valid Error', async () => {
        axios.get.mockImplementation(axiosGetMockFailedWithError);
        const res = await connectorRegistryStorage.getList();
        expect(res).toEqual(new Error('Cannot get list: Something went wront'));
    });
    it('Test "getList" method with invalid Error', async () => {
        axios.get.mockImplementation(axiosGetMockFailedWithoutError);
        const res = await connectorRegistryStorage.getList();
        expect(res).toEqual(new Error('Cannot get list'));
    });
    it('Test "get" method', async () => {
        axios.get.mockImplementation(axiosGetMockSuccess);
        const res = await connectorRegistryStorage.get("connector-2", "0.0.3");
        expect(res).toEqual(data["connector-2"]);
    });
    it('Test "get" method method with valid Error', async () => {
        axios.get.mockImplementation(axiosGetMockFailedWithError);
        const res = await connectorRegistryStorage.get("connector-2", "0.0.3");
        expect(res).toEqual(new Error('Cannot get connector: Something went wront'));
    });
    it('Test "get" method method with invalid Error', async () => {
        axios.get.mockImplementation(axiosGetMockFailedWithoutError);
        const res = await connectorRegistryStorage.get("connector-2", "0.0.3");
        expect(res).toEqual(new Error('Cannot get connector'));
    });
})
