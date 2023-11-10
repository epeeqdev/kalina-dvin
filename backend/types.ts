export interface VersionInfo {
	id: string;
	name: string;
}

export interface TextStructure {
	ru: string;
	am: string;
}

export interface UploadedImageData {
	fileId: string;
	name: string;
	size: number;
	versionInfo: VersionInfo;
	filePath: string;
	url: string;
	fileType: string;
	height: number;
	width: number;
	thumbnailUrl: string;
}

export type BrandRequestDTO = string;
export type CategoryRequestDTO = string;

export type CategoryResponseDTO = {
	_id: string;
	name: TextStructure;
	image: ImageDTO
};
export type BrandResponseDTO = {
	_id: string;
	name: TextStructure;
	image: ImageDTO
};

export type AttributeRequestDTO = {
	attribute: string;
	value: TextStructure;
};

export type ProductAttributeResponseDTO = {
	_id: string
	attribute: {
		name: TextStructure;
		_id: string;
	};
	value: TextStructure;
};

export type AttributesResponseDTO = {
	_id: string
	name: TextStructure;
};

export interface ImageDTO {
	src: string;
	id: string;
	extension: string;
}


export interface ProductRequestDTO {
	title: TextStructure;
	description: TextStructure;
	brand: BrandRequestDTO;
	categories: CategoryRequestDTO[];
	attributes?: AttributeRequestDTO[];
	images?: ImageDTO[]
}

export interface ProductResponseDTO {
	_id: string;
	title: TextStructure;
	description: TextStructure;
	brand: BrandResponseDTO;
	categories: CategoryResponseDTO[];
	attributes: ProductAttributeResponseDTO[];
	images: ImageDTO[]
}
