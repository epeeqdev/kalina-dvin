import * as jose from 'jose';
import { NextRequest, NextResponse } from "next/server";

export const verifyToken = async (req: NextRequest) => {
	const authHeader = req.headers.get("Authorization");
	if (authHeader) {
		const token = authHeader.split(" ")[1];
		try {
			// Here we await the verification of the token
			await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SEC!));
			// If verification is successful, we continue
			return null;
		} catch (err) {
			// If verification fails, we return an unauthorized response
			return handleUnauthorized();
		}
	} else {
		// If there's no Authorization header, we handle as unauthorized
		return handleUnauthorized();
	}
};

export const handleUnauthorized = () => {
	return new NextResponse(JSON.stringify({ error: "Unauthorized access." }), { status: 401 });
};

export function reorderObjectsById(ids: string[], objects: any[]): any[] {
	// Create a map from the objects array for quick lookup
	const objectMap = objects.reduce((acc, obj) => {
		acc[obj._id.toString()] = obj;
		return acc;
	},{})
	// Reorder the objects based on the ids array
	const orderedObjects: any[] = [];
	ids.forEach(id => {
		if (objectMap[id]) {
			orderedObjects.push(objectMap[id]);
		}
	});

	return orderedObjects;
}
