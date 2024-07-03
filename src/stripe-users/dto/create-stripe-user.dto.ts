import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, ArrayUnique, IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateStripeUserDto {

  @ApiProperty({ description: 'The name of the project team', uniqueItems: true })
  @IsNotEmpty()
  @IsString()
  readonly currency: string;

  @ApiProperty({ description: '100' })
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @ApiProperty({ description: '1' })
  @IsNotEmpty()
  @IsNumber()
  readonly quantity: number;

  @ApiProperty({
    description: 'An array of user IDs representing the members of the project team',
    example: ["qwewr345rdfdgv"],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  readonly products: string[];
}
