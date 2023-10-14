import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Switch from '../components/Switch'   

const options = ['option 1', 'option 2', 'option 3']
const mockSetCurrent = jest.fn()

test("Switch renders correctly", () => {
    render(<Switch  options={options} setCurrent={mockSetCurrent} />)

    expect(screen.getByText(/option 1/i)).toBeInTheDocument()
})

test("Switch swaps displayed item correctly", async () => {
    render(<Switch  options={options} setCurrent={mockSetCurrent} />)

    await userEvent.click(screen.getByText(/option 1/i))
    expect(screen.getByText(/option 2/i)).toBeInTheDocument()
})

test("Switch loops back to first item when it reaches last item", async () => {
    render(<Switch  options={options} setCurrent={mockSetCurrent} />)

    // click three times, its not a for loop bc jest doesnt like that :(
    await userEvent.click(screen.getByText(/option 1/i))
    await userEvent.click(screen.getByText(/option 2/i))
    await userEvent.click(screen.getByText(/option 3/i))
    
    expect(screen.getByText(/option 1/i)).toBeInTheDocument()
})

test("Switch calls parent state setter", async () => {
    render(<Switch  options={options} setCurrent={mockSetCurrent} />)

    await userEvent.click(screen.getByText(/option 1/i))
    expect(mockSetCurrent).toHaveBeenCalled()
})