"use strict";
const axios = require('axios').default;
class ConnectorRegistryStorage {
    constructor() {
        this.metadataPath = "https://raw.githubusercontent.com/devx-services/connector-registry/dev/connectors-metadata.json";
    }
    async getList() {
        const metadataList = await axios.get(this.metadataPath);
        console.log(metadataList);
        return [];
    }
    get(name, version) { }
}
const cn = new ConnectorRegistryStorage();
console.log(cn.getList());
module.exports = ConnectorRegistryStorage;
