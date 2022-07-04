import { Module } from '@nestjs/common';
import { UploadController } from 'src/Controllers/upload/upload.controller';
import { UploadService } from 'src/Services/upload/upload.service';

@Module({
	controllers: [UploadController],
	providers: [UploadService],
})
export class UploadModule {}
