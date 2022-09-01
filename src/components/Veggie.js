import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";

function Veggie() {
    const [veggie, setVeggie] = useState([]);
    const [perPage, setPerPage] = useState(() => {
        if (window.matchMedia("(max-width: 568px)").matches) return 1;
        if (window.matchMedia("(max-width: 768px)").matches) return 2;
        if (window.matchMedia("(max-width: 1200px)").matches) return 3;
        return 4;
    });

    useEffect(() => {
        window
            .matchMedia("(max-width: 1200px)")
            .addEventListener("change", (e) => setPerPage(e.matches === true ? 3 : 4));
        window
            .matchMedia("(max-width: 768px)")
            .addEventListener("change", (e) => setPerPage(e.matches === true ? 2 : 3));
        window
            .matchMedia("(max-width: 568px)")
            .addEventListener("change", (e) => setPerPage(e.matches === true ? 1 : 2));
    }, []);

    useEffect(() => {
        getVeggie();
    }, []);

    const getVeggie = async () => {
        const check = localStorage.getItem("veggie");

        if (check) {
            setVeggie(JSON.parse(check));
        } else {
            const api = await fetch(
                `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`
            );

            const data = await api.json();

            localStorage.setItem("veggie", JSON.stringify(data.recipes));
            setVeggie(data.recipes);
        }
    };
    return (
        <div>
            <Wrapper>
                <h3>Vegetarian Picks</h3>

                <Splide
                    options={{
                        perPage: perPage,
                        arrows: false,
                        drag: "free",
                        pagination: true,
                        gap: "2rem",
                    }}>
                    {veggie.map((recipe) => (
                        <SplideSlide key={recipe.id}>
                            <Card>
                                <Link to={`/recipe/${recipe.id}`}>
                                    <p>{recipe.title}</p>
                                    <img src={recipe.image} alt={recipe.title} />
                                    <Gradient />
                                </Link>
                            </Card>
                        </SplideSlide>
                    ))}
                </Splide>
            </Wrapper>
        </div>
    );
}

const Wrapper = styled.div`
    margin: 4rem 0;
`;

const Card = styled.div`
    min-height: 20rem;
    border-radius: 2rem;
    position: relative;

    overflow: hidden;

    img {
        border-radius: 2rem;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    p {
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 0%);
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Veggie;
