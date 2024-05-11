import { useRef, useEffect } from "react";
// imports for redux
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchNewBooks } from "../store/newBooksSlice";
// import styles
import '../styles/NewReleases.css'
// import components
import Book from "./Book";
import LoadingIndicator from "./LoadingIndicator";

export const NewReleases = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { newBooks, loading, error } = useSelector((state: RootState) => state.newBooks)
  const containerRef = useRef<any | null>(null);

  useEffect(() => {
    dispatch(fetchNewBooks());
    console.log(newBooks);
  }, [dispatch]);

  console.log(newBooks)

  if (loading) {
    return <LoadingIndicator/>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  
  const onDragStart = (e: any) => {
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
      containerRef.current.style.userSelect = 'none';
      containerRef.current.dataset.dragStartX = e.clientX.toString();
      containerRef.current.dataset.scrollStartX = containerRef.current.scrollLeft.toString();
    }
  };

  const onDrag = (e: any) => {
    if (containerRef.current && containerRef.current.dataset.dragStartX !== undefined) {
      const dragStartX = parseInt(containerRef.current.dataset.dragStartX);
      const scrollStartX = parseInt(containerRef.current.dataset.scrollStartX);
      const diffX = e.clientX - dragStartX;
      containerRef.current.scrollLeft = scrollStartX - diffX;
    }
  };

  const onDragEnd = () => {
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
      containerRef.current.style.removeProperty('user-select');
      delete containerRef.current.dataset.dragStartX;
      delete containerRef.current.dataset.scrollStartX;
    }
  };

  return (
    <div className="new__releases">
      <h1 className="new__releases-title">NEW RELEASES</h1>
      <div className="new__releases-scrollable-container" ref={containerRef}
        onMouseDown={onDragStart}
        onMouseMove={onDrag}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd} >
          
          {newBooks.map((book) => (
            <Book book={book}/>  
          ))}
      </div>
    </div>
  )
};