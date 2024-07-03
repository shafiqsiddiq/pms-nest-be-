import { Column, JoinTable } from "typeorm";

export class StripeUser {
    @Column()
    teamName: string;

    @JoinTable()
    products: string[];
}
