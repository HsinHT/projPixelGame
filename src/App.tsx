import { Layout } from './components/Layout'
import { GameProvider, useGame } from './store/GameContext'
import { Home } from './pages/Home'
import { Game } from './pages/Game'
import { Result } from './pages/Result'

function GameContent() {
    const { gameState } = useGame();

    switch (gameState) {
        case 'ID_INPUT':
            return <Home />;
        case 'PLAYING':
        case 'SUBMITTING':
            return <Game />;
        case 'RESULT':
            return <Result />;
        case 'LOADING':
            return (
                <div className="flex flex-col items-center gap-4 text-white animate-pulse">
                    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xs">UPLOADING CONSCIOUSNESS...</p>
                </div>
            );
        default:
            return <Home />;
    }
}

function App() {
    return (
        <GameProvider>
            <Layout>
                <GameContent />
            </Layout>
        </GameProvider>
    )
}

export default App
