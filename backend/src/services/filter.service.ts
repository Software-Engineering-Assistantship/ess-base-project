class FilterService {
    static filtrarAcomodacoes(roomsAdequados: any[], filtros: { [key: string]: any }) {
        if (!roomsAdequados || !Array.isArray(roomsAdequados)) {
            throw new Error('Lista de quartos adequada não foi fornecida corretamente.');
        }

        let quartosFiltrados = roomsAdequados.filter(room => {
            return (
                (filtros.ar_condicionado === 'true' ? room.ar_condicionado === true : true) &&
                (filtros.tv === 'true' ? room.tv === true : true) &&
                (filtros.wifi === 'true' ? room.wifi === true : true) &&
                (filtros.petFriendly === 'true' ? room.petFriendly === true : true) &&
                (filtros.cafeDaManha === 'true' ? room.cafeDaManha === true : true) &&
                (filtros.estacionamento === 'true' ? room.estacionamento === true : true)
            );
        });
        
        if (quartosFiltrados.length === 0) {
            throw new Error('Nenhuma acomodação atende aos filtros selecionados.');
        }
        
        // Ordena os quartos filtrados do menor preço para o maior
        quartosFiltrados.sort((a, b) => a.price - b.price);
        
        return quartosFiltrados;
    }
}
export default FilterService;
