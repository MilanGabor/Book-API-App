// import styles
import '../styles/Book.css'

interface BookProps{
  book: any
}

const Book = ({ book }: BookProps) => {

  return (
    <div className="book__card" style={{ background: `url(${book.image})` }}>
      <div className="book__card-price">${Math.round(parseFloat(book.price.replace('$', '').trim()))}</div>
      <div className="book__card-title">{book.title}</div>
      <div className="book__card-subtitle">{book.subtitle}</div>
    </div>
  )
};

export default Book;