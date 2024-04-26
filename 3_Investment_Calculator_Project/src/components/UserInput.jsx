export default function UserInput({ data, onChange }) {
    return (
        <>
            <section id="user-input">

                <div className="input-group">
                    <p>
                        <label htmlFor="initialInvestment">Initial Investment</label>
                        <input id="initialInvestment" type="number" value={data.initialInvestment} onChange={onChange} name="initialInvestment" required />
                    </p>

                    <p>
                        <label htmlFor="annualInvestment">Annual Investment</label>
                        <input id="annualInvestment" type="number" value={data.annualInvestment} onChange={onChange} name="annualInvestment" required />
                    </p>
                </div>

                <div className="input-group">
                    <p>
                        <label htmlFor="expectedReturn">Expected Return</label>
                        <input id="expectedReturn" type="number" value={data.expectedReturn} onChange={onChange} name="expectedReturn" required />
                    </p>

                    <p>
                        <label htmlFor="duration">Duration in Years</label>
                        <input id="duration" type="number" value={data.duration} onChange={onChange} name="duration" required />
                    </p>
                </div>

            </section >
        </>
    )
}