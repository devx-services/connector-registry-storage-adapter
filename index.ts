const axios = require('axios').default;

interface IConnector {
    version: string;
    description: string;
    author: string;
    provider: any;
}

interface IConnectorsMetadataList {
    [key: string]: IConnectorMetadata;
}

interface IConnectorMetadata {
    name: string;
    description: string;
    author: string;
    latest: string;
    versions: string[];
    url: string;
}

class ConnectorRegistryStorage {
    metadataPath: string;
    archivePath: string;
    constructor() {
        this.metadataPath = "https://raw.githubusercontent.com/devx-services/connector-registry/dev/connectors-metadata.json"
        this.archivePath = "https://raw.githubusercontent.com/devx-services/connector-registry/dev/archive"
    }
    async getList():Promise<Error | IConnectorsMetadataList> {
        try {
            const response = await axios.get(this.metadataPath)
            return response.data
        } catch(error) {
            return new Error("Cannot get list")
        }        
    }
    async get(name:string, version:string): Promise<IConnector | Error> {
        try {
            const response = await axios.get(this.generateArchivePath(name, version))
            return response.data
        } catch(error) {
            return new Error("Cannot get connector")
        }
    }

    private generateArchivePath(name:string, version:string):string {
        return `${this.archivePath}/${version}-${name}.json`
    }
}

module.exports = ConnectorRegistryStorage
