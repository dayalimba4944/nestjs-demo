import { IsNotEmpty, IsIn } from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty({ message: 'Title is required' })
  title: string; 

  @IsNotEmpty({ message: 'Content is required' })
  content: string;

  @IsNotEmpty({ message: 'Status is required' })
  @IsIn(['active', 'inactive'], { message: "Status must be either 'active' or 'inactive'" })
  status: string;
}
