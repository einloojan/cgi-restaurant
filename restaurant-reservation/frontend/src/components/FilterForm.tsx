import { useState } from "react"
import type { RecommendationRequest } from "../types"

// Initial structure of this form component was created with the help of ChatGPT.
// The state shape, fields and event handling were reviewed and adapted manually.

type Props = {
  onSearch: (request: RecommendationRequest) => void
}

function FilterForm({ onSearch }: Props) {
  const [formData, setFormData] = useState<RecommendationRequest>({
    reservationStart: "",
    reservationEnd: "",
    partySize: 2,
    zone: "",
    windowSeat: false,
    quietArea: false,
    accessible: false,
    nearPlayArea: false,
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value, type } = e.target
    const checked =
      e.target instanceof HTMLInputElement ? e.target.checked : false

    setFormData(prev => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "partySize"
            ? Number(value)
            : value,
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSearch(formData)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="filter-form"
    >
      <h2>Search tables</h2>
      <label>
        Start time
        <input
          type="datetime-local"
          name="reservationStart"
          value={formData.reservationStart}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        End time
        <input
          type="datetime-local"
          name="reservationEnd"
          value={formData.reservationEnd}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Party size
        <input
          type="number"
          name="partySize"
          value={formData.partySize}
          onChange={handleChange}
          required
          min={1}
        />
      </label>
      <label>
        Zone
        <select
          name="zone"
          value={formData.zone}
          onChange={handleChange}
        >
          <option value="">Any</option>
          <option value="INDOOR">Indoor</option>
          <option value="TERRACE">Terrace</option>
          <option value="PRIVATE_ROOM">Private Room</option>
        </select>
      </label>
      <label className="checkbox-row">
        <input
          type="checkbox"
          name="windowSeat"
          checked={formData.windowSeat}
          onChange={handleChange}
        />
        Window seat
      </label>

      <label className="checkbox-row">
        <input
          type="checkbox"
          name="quietArea"
          checked={formData.quietArea}
          onChange={handleChange}
        />
        Quiet area
      </label>

      <label className="checkbox-row">
        <input
          type="checkbox"
          name="accessible"
          checked={formData.accessible}
          onChange={handleChange}
        />
        Accessible
      </label>

      <label className="checkbox-row">
        <input
          type="checkbox"
          name="nearPlayArea"
          checked={formData.nearPlayArea}
          onChange={handleChange}
        />
        Near play area
      </label>
      <button type="submit">Find recommendations</button>
    </form>
  )
}

export default FilterForm
