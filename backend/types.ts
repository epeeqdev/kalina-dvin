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
	attribute: TextStructure;
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

export type AttributeDTO = {
	name: {
		_id: string,
		am: string,
		ru:string
	}
	_id: string
}

export interface ImageDTO {
	_id?: string;
	src: string;
	id: string;
	/**
	 * @deprecated Field will be removed
	 */
	extension?: string;
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

export interface SlideDTO {
	id?: string;
	_id?: string;
	title: TextStructure;
	description?: TextStructure;
	image: ImageDTO;
	buttonLink?: string;
	buttonText?: TextStructure;
}

export interface MainPageSliderDTO {
	_id?: string;
	slides: SlideDTO[]
}

export interface AboutUsDTO {
	_id?: string;
	image: ImageDTO,
	homePageDescription: TextStructure,
	aboutUsPageDescriptionTop: TextStructure,
	aboutUsPageDescriptionBottom: TextStructure,
	assortmentCount: number,
	brandsCount: number,
	partnersCount: number
}

export interface ProductsPageDTO {
	_id?: string;
	image: ImageDTO
}

export interface CategoriesPageDTO {
	_id?: string;
	image: ImageDTO
}

export interface ContactsPageDTO {
	_id?: string;
	phone: string;
	email: string;
	address: TextStructure;
	socialLinks: {
        instagram: string;
        facebook: string;
    }
}