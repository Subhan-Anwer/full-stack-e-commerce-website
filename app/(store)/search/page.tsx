const SearchPage = async ({ searchParams }: { searchParams: { query: string } }) => {

  const { query } = await searchParams

  return (
    <div>
      <h3 className="font-normal text-lg">Your Search is &quot;<span className="font-bold text-lg">{query}</span>&quot;</h3>
    </div>
  )
}

export default SearchPage