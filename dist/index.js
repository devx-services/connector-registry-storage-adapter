"use strict";
const axios = require('axios').default;
class ConnectorRegistryStorage {
    constructor() {
        this.metadataPath = "https://raw.githubusercontent.com/devx-services/connector-registry/dev/connectors-metadata.json";
        this.archivePath = "https://raw.githubusercontent.com/devx-services/connector-registry/dev/archive";
    }
    async getList() {
        try {
            const response = await axios.get(this.metadataPath);
            return response.data;
        }
        catch (error) {
            return new Error("Cannot get list");
        }
    }
    async get(name, version) {
        try {
            const response = await axios.get(this.generateArchivePath(name, version));
            return response.data;
        }
        catch (error) {
            return new Error("Cannot get connector");
        }
    }
    generateArchivePath(name, version) {
        return `${this.archivePath}/${version}-${name}.json`;
    }
}
module.exports = ConnectorRegistryStorage;
