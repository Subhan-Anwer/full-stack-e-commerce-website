import { Category } from '@/sanity.types'
import React from 'react'

const CategorySelectorComponent = ({categories}: {categories: Category[]}) => {
  return (
    <div className='p-4 bg-blue-500'>
      Category Selector Component
      {categories && (
        <div>here&apos;s your categories</div>
      )}
    </div>
  )
}

export default CategorySelectorComponent
