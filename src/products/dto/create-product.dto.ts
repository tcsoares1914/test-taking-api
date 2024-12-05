import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({
    message: 'O título não pode ser vazio.',
  })
  @IsString({
    message: 'O título deve ser do tipo string.',
  })
  @Length(2, 16, {
    message: 'O título deve ter entre 2 e 16 caracteres .',
  })
  title: string;

  @IsNotEmpty({
    message: 'A descrição não pode ser vazia.',
  })
  @IsString()
  @Length(2, 280, {
    message: 'A descrição deve ter entre 2 e 280 caracteres .',
  })
  description: string;

  @IsNotEmpty({
    message: 'A descrição não pode ser vazia.',
  })
  @IsNumber()
  @IsNotEmpty({
    message: 'O preço não pode ser vazio.',
  })
  price: number;

  @IsNotEmpty({
    message: 'O endereço da foto não pode ser vazio.',
  })
  @IsString({
    message: 'O título deve ser do tipo string.',
  })
  photo: string;
}
