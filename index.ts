/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

require('dotenv').config()
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
    async getList():Promise<Error | IConnectorsMetadataList> {
        try {
            const response = await axios.get(process.env.METADATA_SOURCE_PATH)
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
        return `${process.env.ARCHIVE_SOURCE_PATH}/${version}-${name}.json`
    }
}

module.exports = ConnectorRegistryStorage
