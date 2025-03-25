import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "@/redux/jobSlice";
import {categoryList} from "../../utils/data";


const Category = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchQuery(query));
        navigate("/browse")
    }

    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-12">
                <CarouselContent>
                    {
                        categoryList?.map((cat, index) => (
                            <CarouselItem className="md:basis-1/3 lg:basis-1/3" key={index}>
                                <Button onClick={() => searchJobHandler(cat)} variant='outline' className="rounded-full">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
};

export default Category;