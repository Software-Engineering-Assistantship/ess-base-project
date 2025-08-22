
-- Hoteleiro

insert into "public"."hotelier" ("UF", "address", "cep", "city", "cnpj", "email", "hotel", "id", "n_address", "name", "password", "username") values ('PE', 'Rua das cinzas', '52030010', 'Recife', '23.709.573/0001-94', 'victeste@gmail.com', 'Hotel Cinzas', 1, '4567', 'Victoria Teste', '$2a$12$de9JM9zZ1UPtcQWXdZSrOeSgHkF49gGv6fn6p8C.SF7dFU3n2TliG', 'viccesar');

-- promocao

insert into "public"."promotion" ("discount", "id", "num_rooms", "type") values (60, 1, 3, 'LIMITE_QUARTO');


-- reserva publicadas

insert into "public"."publishedReservation" ("airConditioner", "breakfast", "hotelier_id", "id", "imageUrl", "name", "new_price", "parking", "people", "price", "promotion_id", "room_service", "rooms", "wifi") values (true, false, 1, 1, '/images/1720620898378.png', 'Quarto Esmeralda', 700, true, 3, 700, NULL, true, 1, true);

insert into "public"."publishedReservation" ("airConditioner", "breakfast", "hotelier_id", "id", "imageUrl", "name", "new_price", "parking", "people", "price", "promotion_id", "room_service", "rooms", "wifi") values (true, false, 1, 2, '/images/1720786694423.png', 'Quarto Outono', 1000, true, 3, 1000, 1, true, 2, true);

-- cliente

insert into "public"."client" ("birthDate", "cpf", "email", "id", "name", "password", "phone", "username") values ('2002/12/29', '113.929.999-09', 'mglg@mglg.com', 1, 'Mateus Galdino', '$2b$10$gBxa5q7xDpYZve1frLEune89FPYboyKCY7Isqfh2H7aPd1fWHxZaW', '(81) 99888-8888', 'mglg');

-- metodo de pagamento

insert into "public"."PaymentMethod" ("clientId", "cpf", "cvv", "expiryDate", "id", "name", "numCard", "type") values (1, '113.929.999-09', 433, '30-01', 1, 'Nubank', '1234 5678 9101 1121', 'CREDITO');

-- reserva

insert into "public"."reserve" ("checkin", "checkout", "clientId", "id", "num_adults", "num_children", "num_rooms", "paymentMethodId", "paymentMethodName", "price", "publishedReservationId") values ('2024-07-21', '2024-07-22', 1, 1, 2, 0, 1, 1, 'Nubank', 700, 1);
insert into "public"."reserve" ("checkin", "checkout", "clientId", "id", "num_adults", "num_children", "num_rooms", "paymentMethodId", "paymentMethodName", "price", "publishedReservationId") values ('2024-07-23', '2024-07-28', 1, 2, 2, 0, 1, 1, 'Nubank', 700, 1), ('2024-07-23', '2024-07-28', 1, 3, 3, 0, 2, 1, 'Nubank', 700, 2);
-- rate

insert into "public"."rateReservation" ("client_id", "comments", "rating", "reservation_id") values (1, 'Bom', 4.83, 1);



