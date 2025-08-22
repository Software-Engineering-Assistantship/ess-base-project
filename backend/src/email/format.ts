// Define a function to create HTML content for the email
function formatDate(dateString: string): string {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}
export async function createHtmlContent(nome: string, reserva: string, checkin: string, checkout: string, numQuartos: number, numAdultos: number, numCriancas: number): Promise<string> {
    const checkinFormatted = formatDate(checkin);
    const checkoutFormatted = formatDate(checkout);


    return `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; border-radius: 10px; padding: 20px;">
            <h1 style="color: #333; text-align: center; margin-bottom: 20px;">Olá, ${nome}!</h1>
            <p style="font-size: 16px; color: #333; text-align: center; margin-bottom: 20px;">
                Obrigado por escolher o nosso hotel!<br>
                Sua reserva para o quarto <strong>${reserva}</strong> está confirmada.<br>
                <strong>Check-in:</strong> ${checkinFormatted}<br>
                <strong>Check-out:</strong> ${checkoutFormatted}<br>
                <strong>Número de quartos:</strong> ${numQuartos}<br>
                <strong>Número de adultos:</strong> ${numAdultos}<br>
                <strong>Número de crianças:</strong> ${numCriancas}<br>
                Agora você é o tchan do nosso hotel!<br>
                Estamos ansiosos para a sua estadia.
            </p>
        </div>
    `;
}

export async function createDeleteContent(nome: string, reserva: string, checkin: string, checkout: string, valorRessarcido: number): Promise<string> {
    const checkinFormatted = formatDate(checkin);
    const checkoutFormatted = formatDate(checkout);

    return `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; border-radius: 10px; padding: 20px;">
            <h1 style="color: #333; text-align: center; margin-bottom: 20px;">Olá, ${nome}!</h1>
            <p style="font-size: 16px; color: #333; text-align: center; margin-bottom: 20px;">
                Lamentamos informar que sua reserva para o quarto <strong>${reserva}</strong> foi cancelada.<br>
                <strong>Check-in:</strong> ${checkinFormatted}<br>
                <strong>Check-out:</strong> ${checkoutFormatted}<br>
                O valor de <strong>R$${valorRessarcido.toFixed(2)}</strong> será ressarcido.<br>
                Esperamos poder atendê-lo em outra ocasião.
            </p>
        </div>
    `;
}


export async function createUpdateContent(nome: string, reserva: string, checkin: string, checkout: string, numQuartos: number, numAdultos: number, numCriancas: number): Promise<string> {
    const checkinFormatted = formatDate(checkin);
    const checkoutFormatted = formatDate(checkout);

    return `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; border-radius: 10px; padding: 20px;">
            <h1 style="color: #333; text-align: center; margin-bottom: 20px;">Olá, ${nome}!</h1>
            <p style="font-size: 16px; color: #333; text-align: center; margin-bottom: 20px;">
                Sua reserva para o quarto <strong>${reserva}</strong> foi atualizada.<br>
                <strong>Check-in:</strong> ${checkinFormatted}<br>
                <strong>Check-out:</strong> ${checkoutFormatted}<br>
                <strong>Número de quartos:</strong> ${numQuartos}<br>
                <strong>Número de adultos:</strong> ${numAdultos}<br>
                <strong>Número de crianças:</strong> ${numCriancas}<br>
                Agradecemos por continuar conosco!<br>
                Estamos ansiosos para a sua estadia.
            </p>
        </div>
    `;
}

