import { Controller, Get } from '@nestjs/common';
import { VideosService } from './videos.service';
import { ApiResponse } from '@nestjs/swagger';
import { ErrorEntity } from 'src/entities/error.entity';
import { Video } from './entities/video.entity';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  @ApiResponse({ status: 200, type: Video, description: 'lista de videos' })
  @ApiResponse({
    status: 500,
    type: ErrorEntity,
    description: 'falha ao criar o usuário',
  })
  findAll() {
    return this.videosService.findAll();
  }
}
