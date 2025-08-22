export interface RateModel {
    client_id: number;
    reservation_id: number;
    rating: number;
    comments?: string | null;
}
