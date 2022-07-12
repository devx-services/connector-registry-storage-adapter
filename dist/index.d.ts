declare const axios: any;
interface IConnector {
    version: string;
    description: string;
    author: string;
    provider: any;
}
interface IConnectorMetadata {
    name: string;
    description: string;
    author: string;
    latest: string;
    versions: string[];
    url: string;
}
declare class ConnectorRegistryStorage {
    metadataPath: string;
    constructor();
    getList(): Promise<IConnectorMetadata[]>;
    get(name: string, version: string): void;
}
declare const cn: ConnectorRegistryStorage;
