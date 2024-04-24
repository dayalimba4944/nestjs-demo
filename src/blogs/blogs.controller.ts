import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards , ValidationPipe } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) { }

  // @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createBlogDto: CreateBlogDto) {
    try {
      let errorValidation = {};
      const title = createBlogDto.title;
      const content = createBlogDto.content;
      const foundTitle = await this.blogsService.findProfileByTitle(title);
      const foundContent = await this.blogsService.findProfileByContent(content);

      if (foundTitle) {
        errorValidation['Title'] = 'Error: Blog post with the same title already exists';
      }
      if (foundContent) {
        errorValidation['Content'] = 'Error: Blog post with the same content already exists';
      }

      if (Object.keys(errorValidation).length === 0) {
        await this.blogsService.create(createBlogDto);
        return 'Blog post created successfully';
      } else {
        return errorValidation;
      }
    } catch (error) {
      return 'Error: ' + error.message;
    }
  }


  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    var blog = this.blogsService.findOne(id);
    if (Object.keys(blog).length == 0) {
      return 'Error: Data not found';
    }
    return blog;
  }

  @Patch(':id')
  async updates(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    try {
      let errorValidation = {};
      const title = updateBlogDto.title;
      const content = updateBlogDto.content;
      const blog = await this.blogsService.findOne(id);
  
      if (!blog) {
        return 'Error: Data not found: wrong id';
      }

      if (!title && !content) {
        return 'Error: No fields to update';
      }
  
      if (title && blog.title !== title) {
        const foundTitle = await this.blogsService.findProfileByTitle(title);
        if (foundTitle) {
          errorValidation['Title'] = 'Error: Blog post with the same title already exists';
        }
      }
  
      if (content && (blog.content !== content)) {
        const foundContent = await this.blogsService.findProfileByContent(content);
        if (foundContent) {
          errorValidation['Content'] = 'Error: Blog post with the same content already exists';
        }
      }
  
      if (Object.keys(errorValidation).length === 0) {
        await this.blogsService.update(id, updateBlogDto);
        return 'Blog post updated successfully';
      } else {
        return errorValidation;
      }
    } catch (error) {
      return 'Error: ' + error.message;
    }
  }
  

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    try {
      let errorValidation = {};
      const title = updateBlogDto.title;
      const content = updateBlogDto.content;
      const blog = await this.blogsService.findOne(id);
  
      if (!blog) {
        return 'Error: Data not found: wrong id';
      }

      if (!title && !content) {
        return 'Error: No fields to update';
      }
  
      if (title && blog.title !== title) {
        const foundTitle = await this.blogsService.findProfileByTitle(title);
        if (foundTitle) {
          errorValidation['Title'] = 'Error: Blog post with the same title already exists';
        }
      }
  
      if (content && (blog.content !== content)) {
        const foundContent = await this.blogsService.findProfileByContent(content);
        if (foundContent) {
          errorValidation['Content'] = 'Error: Blog post with the same content already exists';
        }
      }
  
      if (Object.keys(errorValidation).length === 0) {
        await this.blogsService.update(id, updateBlogDto);
        return 'Blog post updated successfully';
      } else {
        return errorValidation;
      }
    } catch (error) {
      return 'Error: ' + error.message;
    }
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    const blog = this.blogsService.findOne(id);
    if (Object.keys(blog).length != 0) {
      return this.blogsService.remove(id);
    } else {
      return 'Error: Data not found';
    }
  }



}
