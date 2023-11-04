export interface VersionInfo {
	id: string;
	name: string;
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
