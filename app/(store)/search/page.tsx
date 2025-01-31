const SearchPage = async ({ searchParams }: { searchParams: { query: string } }) => {

  const { query } = await searchParams

  return (
    <div>
      <h3 className="font-normal text-lg">Your Search is "<span className="font-bold text-lg">{query}</span>"</h3>
    </div>
  )
}

export default SearchPage