import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export const GET = async (req: NextRequest, { params }: any) => {
  try {
    const { id } = params;

    const { data } = await axios.get(
      `${process.env.SERVER}/posts?user.id=${id}`
    );
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
