import { MenuItem } from '../../menu/entities/menu-item';

export class Promotion {
    id: string
    name: string
    description: string
    discount: number
    startDate: string
    endDate: string   
    menuItens?: MenuItem[]
}
