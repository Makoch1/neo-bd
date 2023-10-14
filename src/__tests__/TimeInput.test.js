import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TimeInput from '../components/TimeInput'

const mockSetTime = jest.fn()

test("TimeInput displays user input", async () => {
    render(<TimeInput setUserTime={mockSetTime} />)
    const hrInput = screen.getByPlaceholderText(/hr/)
    const minuteInput = screen.getByPlaceholderText(/min/i)

    await userEvent.type(hrInput, "4")
    await userEvent.type(minuteInput, "44")
    expect(hrInput.value).toBe("4")
    expect(minuteInput.value).toBe("44")
})

test("TimeInput rejects invalid input that is not numeric", async () => {
    render(<TimeInput setUserTime={mockSetTime} />)
    const minuteInput = screen.getByPlaceholderText(/min/i)

    await userEvent.type(minuteInput, "a")
    expect(minuteInput.value).toBe("")
})

test("TimeInput rejects invalid input that is higher than max allowed", async () => {
    render(<TimeInput setUserTime={mockSetTime} />)
    const hrInput = screen.getByPlaceholderText(/hr/i)

    await userEvent.type(hrInput, "26")
    expect(hrInput.value).toBe("2")
})

test("TimeInput calls parent time state setter", async () => {
    render(<TimeInput setUserTime={mockSetTime} />)
    
    await userEvent.type(screen.getByPlaceholderText(/hr/i), "2")
    expect(mockSetTime).toBeCalled()
})