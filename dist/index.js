"use strict";
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
const axios = require('axios').default;
class ConnectorRegistryStorage {
    constructor(storagePath = "https://raw.githubusercontent.com/adobe/api-mesh-sources/main", metadataSourcePath = "connectors-metadata.json", archiveSourcePath = "archive") {
        this.metadataSourcePath = `${storagePath}/${metadataSourcePath}`;
        this.archiveSourcePath = `${storagePath}/${archiveSourcePath}`;
    }
    getMetadataSourcePath() {
        return this.metadataSourcePath;
    }
    getArchiveSourcePath() {
        return this.archiveSourcePath;
    }
    async getList() {
        try {
            const response = await axios.get(this.getMetadataSourcePath());
            return response.data;
        }
        catch (error) {
            if (error instanceof Error) {
                return new Error(`Cannot get list: ${error.message}`);
            }
            else {
                return new Error(`Cannot get list`);
            }
        }
    }
    async get(name, version) {
        try {
            const response = await axios.get(this.generateArchivePath(name, version));
            return response.data;
        }
        catch (error) {
            if (error instanceof Error) {
                return new Error(`Cannot get connector: ${error.message}`);
            }
            else {
                return new Error(`Cannot get connector`);
            }
        }
    }
    generateArchivePath(name, version) {
        return `${this.getArchiveSourcePath()}/${version}-${this.normalizeName(name)}.json`;
    }
    normalizeName(name) {
        return name.toLocaleLowerCase().split(' ').join('-');
    }
}
module.exports = ConnectorRegistryStorage;
