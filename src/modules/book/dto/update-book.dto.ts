import { OmitType } from "@nestjs/swagger";
import { CreateBookDto } from "./create-book.dto";

export class UpdateBookDto extends OmitType(CreateBookDto, ['ISBN'] as const) {
}