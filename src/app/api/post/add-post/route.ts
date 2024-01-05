import axios from 'axios';

export const POST = async (request: any) => {
  const { userId, tag, description, image } = await request.json();

  try {
    const response = await axios.post(`${process.env.SERVER}/posts`, {
      userId: userId,
      tag: tag,
      description: description,
      image: image,
      date: new Date(),
    });

    return new Response('The post has been creates successfully', {
      status: 201,
    });
  } catch (error) {
    return new Response('Failed to create a new post', { status: 500 });
  }
};
