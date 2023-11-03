import jwt from "jsonwebtoken";
import {NextRequest, NextResponse} from "next/server";
import path from "path";
import fs from "fs";
import {Image} from "@/app/admin/types";

export const verifyToken = (req: NextRequest) => {
	const authHeader = req.headers.get("Authorization");
	if (authHeader) {
		const token = authHeader.split(" ")[1];
		jwt.verify(token, process.env.JWT_SEC, (err) => {
			if (err) {
				return new NextResponse(JSON.stringify({error: "Token is invalid."}), {status: 401})
			}
			return null;
		});
	} else {
		return handleUnauthorized()
	}
};

export const handleUnauthorized = () => {
	return new NextResponse(JSON.stringify({error: "Token is invalid."}), {status: 401})
}

export async function removeFiles(fileNames: string[], folderPath: string) {
	const removeFilePromises = fileNames.map(fileName => {
		const filePath = path.join(folderPath, fileName);
		return fs.unlink(filePath, (err) => {
			if (err) {
				if (err?.code === 'ENOENT') {
					console.log('File not found', filePath);
				} else {
					console.error('Error removing file', filePath, err);
				}
			} else {
				console.log('File removed', filePath)
			}
		})
	});

	await Promise.all(removeFilePromises);
}


export async function createFiles(files: Image[], folderPath: string) {
	if (!fs.existsSync(folderPath)) {
		fs.mkdirSync(folderPath, {recursive: true});
	}

	const createFilePromises = files.map(file => {
		const filePath = path.join(folderPath, `${file.id}.${file.extension}`);
		const base64Image = file.src.split(';base64,').pop()!;
		return fs.writeFile(filePath, base64Image, {encoding: 'base64'}, (err) => {
			if (err) {
				console.error('Error creating file', filePath, err)
			} else {
				console.log('File created', filePath)
			}
		})
	});

	await Promise.all(createFilePromises);
}
