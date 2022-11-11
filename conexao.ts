import makeWASocket,{
    useSingleFileAuthState,
} from "@adiwajshing/baileys";


export const conectar = async () => { // isso vai salvar o estado da conexão, caso desconecte (vai salvar as mensagens antes enviadas)
    
    const { state, saveState } = useSingleFileAuthState(
        "./cache/auth_info_multi.json")

    const socket = makeWASocket({
        auth: state,
        printQRInTerminal: true, 
    });

    /*socket.ev.on('connection.update', async (update) => {
        const {connection, lastDisconnect} = update;

        if (connection === 'close'){
            const shoudReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== 
            DisconnectReason.loggedOut; //se o motivo do disconnect não for deslogar

            if(shoudReconnect){
                await conectar();
            };
        };
        });*/

    socket.ev.on("creds.update", saveState);

    return socket;
};