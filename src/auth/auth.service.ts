import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Person } from '../entities/person.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, password, name, yob } = registerDto;

    // Check if user already exists
    const existingUser = await this.personRepository.findOne({
      where: { username },
    });

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newPerson = this.personRepository.create({
      username,
      password: hashedPassword,
      name,
      yob,
    });

    const savedPerson = await this.personRepository.save(newPerson);

    // Generate JWT token
    const payload = { sub: savedPerson.id, username: savedPerson.username };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: savedPerson.id,
        username: savedPerson.username,
        name: savedPerson.name,
        yob: savedPerson.yob,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    // Find user
    const person = await this.personRepository.findOne({
      where: { username },
    });

    if (!person) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, person.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload = { sub: person.id, username: person.username };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: person.id,
        username: person.username,
        name: person.name,
        yob: person.yob,
      },
    };
  }

  async validateUser(userId: string) {
    const person = await this.personRepository.findOne({
      where: { id: userId },
    });

    if (!person) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: person.id,
      username: person.username,
      name: person.name,
      yob: person.yob,
    };
  }
}

