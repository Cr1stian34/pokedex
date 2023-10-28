import { useDispatch } from "react-redux";
import { setTrainerName } from "../store/slice/trainerName.slice";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setTrainerName(e.target.trainerName.value))
        navigate("/pokedex");
    }
    return (
        <main className="mainHome bg-[#D3D3D3]">
            <section className="max-w-[500px] h-[80vh] homePokedex text-center grid justify-center items-center">
                <div className="grid gap-5 mt-[3rem]">
                    <div>
                        <img src="/logo.png" alt="" />
                    </div>
                    <div>
                        <h3 className="text-[#FE1936] text-[50px]">Hi Coach!</h3>
                        <p className="text-[#302F2F] text-[25px] mt-[-15px]">To start give me to name</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} action="" className="formHome">
                    <input className="inputHome w-[70%] px-5 py-2" name="trainerName" placeholder="Your name..." type="text" />
                    <button className="btnStart w-[30%]">Start!</button>
                </form>
            </section>
            <footer className="footerHome relative">
                <div className="w-[100%] h-[70%] bg-[#DD1A1A]"></div>
                <div className="w-[100%] h-[30%] bg-[#0C0C0C]"></div>
                <div className="absolute top-[41%] w-[70px] left-[45%]">
                    <img src="/eclipse.png" alt="" />
                    <img className="absolute top-[15px] left-[15px] w-[40px]" src="/eclipse2.png" alt="" />
                </div>
            </footer>
        </main>
    )
}

export default Home