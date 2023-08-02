import EnhancedTable from "./components/Table";
import TextField from "./components/TextField";
import Button from "./components/Button";

import { useForm, Controller } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import * as S from "./styles";
import { historicFinances } from "./api/routes/finances";

const ControllerTextField = ({ label, name, control, errors }) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <TextField
        label={label}
        error={errors}
        helperText={errors?.message}
        {...field}
      />
    )}
  />
);

const ControllerSelect = ({ name, control, errors, value, onChange }) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <Select
        title="Teste"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Age"
        onChange={onChange}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    )}
  />
);

function App() {
  const [age, setAge] = useState("");
  const [historic, setHistoric] = useState([]);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    // defaultValues: {
    //   user: "",
    //   password: "",
    //   keepMeConnected: false,
    // },
    // resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const fetchHistoricFinances = async () => {
      const response = await historicFinances();
      setHistoric(response);
    };

    fetchHistoricFinances();
  }, []);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const onSubmit = async (data) => {
    try {
      console.log("🚀 ~ file: App.js:66 ~ onSubmit ~ data:", {
        ...data,
        date: new Date(),
      });
    } catch (error) {
      console.log("🚀 ~ file: App.js:72 ~ onSubmit ~ error:", error);
    }
  };

  return (
    <section>
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <ControllerTextField
          name="title"
          label="Título"
          control={control}
          errors={errors?.title}
        />
        <ControllerSelect
          name="operation"
          control={control}
          value={age}
          onChange={handleChange}
        />
        <ControllerSelect
          name="category"
          control={control}
          value={age}
          onChange={handleChange}
        />
        <ControllerTextField
          label="Valor(R$)"
          name="value"
          control={control}
          errors={errors?.title}
        />
        <Button type="submit" loading={isSubmitting}>
          Cadastrar
        </Button>
      </form>
      <S.WrappperCard>
        <Card type="entrada" value="1" />
        <Card type="saída" value="2" />
        <Card type="total" value="3" />
      </S.WrappperCard>

      {historic.length > 0 ? (
        <EnhancedTable data={historic} />
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
}

export default App;
