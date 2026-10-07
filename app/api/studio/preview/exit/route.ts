import { NextResponse,type NextRequest } from 'next/server';
import { draftMode } from 'next/headers';
export async function GET(request:NextRequest){(await draftMode()).disable();return NextResponse.redirect(new URL('/studio',request.url));}
