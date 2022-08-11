declare const axios: any;
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
declare class ConnectorRegistryStorage {
    getList(): Promise<Error | IConnectorsMetadataList>;
    get(name: string, version: string): Promise<IConnector | Error>;
    private generateArchivePath;
}
