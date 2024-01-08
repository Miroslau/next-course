import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export const GET = async (req: NextRequest, { params }: any) => {
  try {
    const { id } = params;
    const { data } = await axios.get(`${process.env.SERVER}/posts/${id}`);
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

export const DELETE = async (req: NextResponse, { params }: any) => {
  try {
    const { id } = params;

    await axios.delete(`${process.env.SERVER}/posts/${id}`);
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error,
    });
  }
};
