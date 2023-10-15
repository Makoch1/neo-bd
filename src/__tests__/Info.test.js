import { render, screen } from '@testing-library/react'
import Info from '../components/Info'

test("Info component renders correctly", () => {
    render(<Info className={'test-class'} label={'test label'} info={'test info.'} />)

    const element = screen.getByText(/test label/i)
    expect(element).toBeInTheDocument()
})