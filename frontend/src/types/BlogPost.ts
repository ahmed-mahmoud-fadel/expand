interface BlogPost {
  id: number,
  title: string,
  description: string,
  date: Date,
  thumbnail?: string,
  link: string,
  active: boolean,
}

export default BlogPost