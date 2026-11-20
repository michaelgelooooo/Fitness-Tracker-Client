<script setup>
import { ref, watch } from "vue";
import { Notyf } from "notyf";
import { useRouter } from "vue-router";
import api from "../api";

const notyf = new Notyf();
const router = useRouter();

const name = ref("");
const duration = ref("");

const isEnabled = ref(false);
const isSubmitting = ref(false);

watch([name, duration], (currentValue) => {
	isEnabled.value = currentValue.every((input) => input.toString().trim() !== "") && Number(duration.value) > 0;
});

async function addWorkout() {
	isSubmitting.value = true;

	try {
		await api.post("/workouts/addWorkout", {
			name: name.value,
			duration: Number(duration.value),
		});

		notyf.success("Workout added successfully!");

		await router.push({ name: "Workouts" });
	} catch (error) {
		console.error("Add Workout Error:", error);

		notyf.error(error.response?.data?.error?.message || error.response?.data?.error || "Unable to add your workout. Please try again.");
	} finally {
		isSubmitting.value = false;
	}
}
</script>

<template>
	<section id="add-workout">
		<div class="container">
			<div class="row justify-content-center align-items-center py-5">
				<div class="col-md-8 col-lg-5 col-xl-4">
					<div class="card border-0 shadow rounded-4">
						<div class="card-body p-4 p-md-5">
							<div class="text-center mb-4">
								<h2 class="fw-bold text-primary">MOTIVA.</h2>
								<h4 class="fw-bold mt-3">Add Workout</h4>
								<p class="text-secondary">Make every workout count.</p>
							</div>

							<form @submit.prevent="addWorkout">
								<div class="mb-3">
									<label for="name" class="form-label fw-semibold"> Workout Name </label>

									<input type="text" id="name" class="form-control form-control-lg" placeholder="Enter workout name" v-model="name" required />
								</div>

								<div class="mb-4">
									<label for="duration" class="form-label fw-semibold"> Duration (minutes) </label>

									<input type="number" id="duration" class="form-control form-control-lg" placeholder="Enter duration" v-model="duration" min="1" required />
								</div>

								<button type="submit" class="btn btn-primary btn-lg w-100" :disabled="!isEnabled || isSubmitting">
									<span v-if="isSubmitting">
										<span class="spinner-border spinner-border-sm me-2"></span>
										Adding Workout...
									</span>

									<span v-else>
										<i class="bi bi-plus-lg me-1"></i>
										ADD WORKOUT
									</span>
								</button>
							</form>

							<div class="text-center mt-4">
								<router-link :to="{ name: 'Workouts' }" class="text-secondary text-decoration-none">
									<i class="bi bi-arrow-left me-1"></i>
									Back to Workouts
								</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
#add-workout .row {
	min-height: 95vh;
}
</style>
