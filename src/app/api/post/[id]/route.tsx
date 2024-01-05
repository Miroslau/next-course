import { NextResponse } from 'next/server';
import axios from 'axios';

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
