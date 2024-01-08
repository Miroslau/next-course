import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export const GET = async (request: NextRequest) => {
  try {
    const { data } = await axios.get(`${process.env.SERVER}/posts`);

    return NextResponse.json({
      success: true,
      response: data,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error,
    });
  }
};
